pipeline {
    agent any

    environment {
        DOCKER_REPO     = "subhasingha01/devops-engineering"
        FRONTEND_IMAGE  = "${DOCKER_REPO}:frontend-v1"
        BACKEND_IMAGE   = "${DOCKER_REPO}:backend-v1"
        MONGODB_URI     = "mongodb+srv://greatstack:Devops123@cluster0.ajdto.mongodb.net"
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
                echo "Building frontend Docker image..."
                sh 'docker build --build-arg VITE_BACKEND_URL=http://16.16.255.56:4003 -t $FRONTEND_IMAGE .'
            }
        }

        stage('Build Backend Image') {
            steps {
                echo "Building backend Docker image..."
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
                    echo "Deploying containers on EC2..."

                    # Stop and remove old containers if they exist
                    docker rm -f frontend || true
                    docker rm -f backend || true

                    echo "Pulling latest images..."
                    docker pull $FRONTEND_IMAGE
                    docker pull $BACKEND_IMAGE

                    echo "Starting backend container..."
                    docker run -d \
                        --name backend \
                        -p 4003:4001 \
                        -e MONGODB_URI="$MONGODB_URI" \
                        -e JWT_SECRET="greatstack" \
                        -e ADMIN_EMAIL="admin@gaze.com" \
                        -e ADMIN_PASSWORD="qwerty123" \
                        -e CLODINARY_NAME="doxevlw5l" \
                        -e CLODINARY_API_KEY="277253128136753" \
                        -e CLODINARY_SECRET_KEY="vnoXhFSTLjVjOJIC_8CCCH1iWx4" \
                        $BACKEND_IMAGE

                    docker run -d \
                        --name frontend \
                        -p 80:80 \
                        $FRONTEND_IMAGE

                    echo "✅ Deployment complete!"
                    
                    echo "Currently running containers:"
                    docker ps -a
                '''
            }
        }
    }

    post {
        success {
            echo "🎉 Pipeline succeeded! Frontend and Backend are running."
        }
        failure {
            echo "❌ Pipeline failed! Check logs for errors."
        }
    }
}
