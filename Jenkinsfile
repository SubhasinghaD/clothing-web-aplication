pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/username/repo.git'
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
                sh 'docker build -t username/your-react-app:latest .'
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
                    sh 'docker push username/your-react-app:latest'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh '''
                docker pull username/your-react-app:latest
                docker stop react-app || true
                docker rm react-app || true
                docker run -d -p 80:80 --name react-app username/your-react-app:latest
                '''
            }
        }
    }
}
