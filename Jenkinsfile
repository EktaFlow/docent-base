/*
* Ekta - mpf
* The purpose of this file is to define a pipeline that can take a dev branch and 
* build the latest push to the dev branch and deploy to the dev deployment
*
* This utilizes a simpler pipeline, designed only to build & deploy and image
*/

def repo
def serviceName
def imageName
def containerImagePath

def branchName = "${env.BRANCH_NAME}"
if (branchName == 'master') {
        branchName = 'prod'
}
//  def dockerSuffix = "dev"
//  def kubectlNamespace = "dev"

podTemplate(label: 'back', 
    containers: [
        containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl', command: 'cat', ttyEnabled: true),
        containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true )
    ],
    volumes: [ 
        hostPathVolume(mountPath: '/var/run/docker.sock', 
                       hostPath: '/var/run/docker.sock')
    ]
){
                node('back') {

                        deleteDir()
                        
                        try {
                                stage ('setup') {
/*
          if (!branchName == "dev") {
                                                  echo 'How did you get here you clever dog?'
              // throw some cool error and kick them out. 
          }
*/
          checkout scm
          repo = getRepoName()
          serviceName = getServiceName(repo)
                imageName = "${serviceName}-${branchName}:${env.BUILD_NUMBER}"
                latestImageName = "${serviceName}-${branchName}:latest"
              }  
                                stage ('Build and Push') {
          container('docker') {
            withCredentials([
                string(credentialsId: 'containerRegistry', variable: 'CONTAINER_REGISTRY'),
                usernamePassword(credentialsId: 'containerRegistryCreds', passwordVariable: 'password', usernameVariable: 'user')
            ]){
                                            checkout scm
              containerImagePath = "${CONTAINER_REGISTRY}/${imageName}"
              latestImagePath    = "${CONTAINER_REGISTRY}/${latestImageName}"
              sh "docker build -t ${containerImagePath} -t ${latestImagePath} ."
              sh "docker login ${CONTAINER_REGISTRY} -u ${user} -p ${password}"
              sh "docker push ${containerImagePath}"
              sh "docker push ${latestImagePath}"
            }
          }
                                }
                                stage ('Deploy') {
            container('kubectl') {
                // echo 'not actually rollin the k8s'
                // sh "kubectl set image deployment/dev -n ${branchName} ${serviceName}=${containerImagePath}"
            }
                                }
                        } catch (err) {
                                currentBuild.result = 'FAILED'
                                throw err
                        }
                }
}

String getRepoName() {
        return scm.getUserRemoteConfigs()[0].getUrl().tokenize('/')[3].split("\\.")[0]
}

String getServiceName(String repoName) {
        def matchingMap = [:]
  matchingMap["docent-back"] = "back"
  matchingMap["docent-base"] = "front"
  matchingMap["auth_service"] = "auth"


  return matchingMap[repoName]
}
