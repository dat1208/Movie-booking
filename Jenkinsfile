pipeline {
    agent any
    stages {
        stage('Install') {
            steps {
                echo 'Installing...'
                sh 'npm install'
            }
        }
        stage('Run') {
            steps {
                echo 'Running...'
                sh 'npm run dev'
            }
        }
    }
}