pipeline {
  agent { label 'nodejs9.6.1' }
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