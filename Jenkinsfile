pipeline {
  agent { dockerfile true }
  stages {
    stage ('checkout') {
      steps {
        checkout scm
      }
    }
    stage ('run docker-compose and build image') {
      steps {
        sh '''
          docker-compose up
          docker-compose up --build
        '''
      }
    }
  }
}
