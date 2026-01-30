pipeline {
    agent any

    environment {
        IMAGE_NAME = "username/your-react-app:latest"
    }

    tools {
        nodejs "NodeJS_18" // Name of your NodeJS installation in Global Tool Configuration
    }

    stages {

        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Push Docker Image') {
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
                        docker push $IMAGE_NAME
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh '''
                    docker pull $IMAGE_NAME
                    docker stop react-app || true
                    docker rm react-app || true
                    docker run -d -p 80:80 --name react-app $IMAGE_NAME
                '''
            }
        }
    }
}
