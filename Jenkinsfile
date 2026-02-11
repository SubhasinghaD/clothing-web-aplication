pipeline {
    agent any

    environment {
        DOCKER_REPO = "subhasingha01/devops-engineering"
        FRONTEND_IMAGE = "${DOCKER_REPO}:frontend-v1"
        BACKEND_IMAGE  = "${DOCKER_REPO}:backend-v1"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/SubhasinghaD/clothing-web-aplication.git'
            }
        }

        // ---------------- FRONTEND ----------------
        stage('Build Frontend Image') {
            steps {
                sh '''
                    docker build -t $FRONTEND_IMAGE .
                '''
            }
        }

        // ---------------- BACKEND ----------------
        stage('Build Backend Image') {
            steps {
                sh '''
                    docker build -t $BACKEND_IMAGE ./backend
                '''
            }
        }

        // ---------------- PUSH ----------------
        stage('Push Images to DockerHub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push $FRONTEND_IMAGE
                        docker push $BACKEND_IMAGE
                    '''
                }
            }
        }

        // ---------------- DEPLOY ----------------
        stage('Deploy Containers') {
            steps {
                sh '''
                    docker pull $FRONTEND_IMAGE
                    docker pull $BACKEND_IMAGE

                    docker stop frontend || true
                    docker rm frontend || true
                    docker stop backend || true
                    docker rm backend || true

                    docker run -d \
                        --name backend \
                        -p 4003:4003 \
                        $BACKEND_IMAGE

                    docker run -d \
                        --name frontend \
                        -p 80:80 \
                        $FRONTEND_IMAGE
                '''
            }
        }
    }
}
