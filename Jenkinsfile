pipeline {
  agent any
  stages {
    stage('Example0') {
      steps {
        parallel(
          "Example": {
            sh 'npm run build'
            
          },
          "\u663E\u793A\u7248\u672C": {
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