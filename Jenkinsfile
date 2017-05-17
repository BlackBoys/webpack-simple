pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        parallel(
          "test": {
            sh 'npm run build'
            
          },
          "\u663E\u793A\u7248\u672C": {
            sh 'npm -v'
            
          }
        )
      }
    }
  }
  tools {
    nodejs 'node7.10.0'
  }
}