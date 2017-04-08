pipeline {
  agent any
  stages {
    stage('Example') {
      steps {
        sh 'npm run build'
      }
    }
    stage('test') {
      steps {
        sh 'npm -v'
      }
    }
  }
  tools {
    nodejs 'node6.10.0'
  }
}