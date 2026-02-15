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

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t $FRONTEND_IMAGE .'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t $BACKEND_IMAGE ./backend'
            }
        }

        stage('Login & Push to DockerHub') {
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

        stage('Deploy Containers on EC2') {
            steps {
                sh '''
                    echo "Stopping old containers..."

                    docker stop frontend || true
                    docker rm frontend || true
                    docker rm -f backend

                    echo "Pulling latest images..."

                    docker pull $FRONTEND_IMAGE
                    docker pull $BACKEND_IMAGE

                    echo "Starting backend..."

                    docker run -d \
                        --name backend \
                        -p 4003:4001 \
                        -e MONGODB_URI="mongodb+srv://greatstack:Devops123@cluster0.ajdto.mongodb.net" \
                    $BACKEND_IMAGE

                    echo "Starting frontend..."

                    docker run -d \
                        --name frontend \
                        -p 80:80 \
                        $FRONTEND_IMAGE
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful!"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}
