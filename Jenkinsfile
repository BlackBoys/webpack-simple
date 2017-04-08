pipeline {
    agent any
    tools {
        nodejs 'node6.10.0'
    }
    stages {
        stage('Example') {
            steps {
                sh 'npm run build'
            }
        }
        stage('test') {
            steps {
                sh 'npm -verson'
            }
        }
    }
}