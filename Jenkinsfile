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
    stage('tonginx') {
      steps {
        sh 'cp -rf ./dist/* /zhongheng'
        timestamps()
      }
    }
  }
  tools {
    nodejs 'node6.10.0'
  }
}