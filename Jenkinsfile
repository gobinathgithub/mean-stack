pipeline {
  agent { dockerfile true }
  stages {
    stage ('checkout') {
      steps {
        checkout scm
      }
    }
    stage ('build image') {
      steps {
        sh '''
          docker-compose up --build
        '''
      }
    }
  }
}
