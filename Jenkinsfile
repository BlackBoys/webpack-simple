pipeline {
  agent any
  stages {
    stage('Example0') {
      steps {
        parallel(
          "Example": {
            sh 'npm run build'
            
          },
          "\u90E8\u7F72": {
            sh 'npm -v'
            
          }
        )
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