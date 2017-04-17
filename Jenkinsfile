pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        parallel(
          "compile": {
            sh 'npm run build'
            sh 'node -v'
            
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