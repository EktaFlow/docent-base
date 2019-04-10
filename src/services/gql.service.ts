import gql from "graphql-tag";

export var assessmentQuery = gql`
query assessments($userId: String) {
	assessments(userId: $userId) {
	   scope
     targetMRL
     targetDate
     levelSwitching
     deskbookVersion
     location
     name
		 id
			teamMembers {
				name
				email
				role
			}
	}
}
`
export var createAssessmentMutation = gql`
 mutation createAssessment(
     $threads:     [Int],
     $location:    String,
     $targetMRL:   Int,
     $id:          Int,
     $scope:       String,
     $targetDate:  Date,
		 $deskbookVersion: String,
     $name: String
		 $levelSwitching: Boolean
		 $userId: String
		 $userEmail: String
		 $teamMembersUpdates: [TeamMemberInput]
		 $schema: String
   ) {
     createAssessment(
       threads:    $threads,
       userId:     $userId,
			 userEmail: $userEmail,
       location:   $location,
       targetMRL:  $targetMRL,
       id:         $id,
       scope:      $scope,
       targetDate: $targetDate,
       deskbookVersion: $deskbookVersion,
			 name: $name,
			 teamMembersUpdates: $teamMembersUpdates,
			 levelSwitching: $levelSwitching,
			 schema: $schema
     ) {
          _id

       }
     }
`

export var questionPageAssessmentQuery = gql`
query assessment($_id: String)
{
 assessment(_id: $_id)  {
	questions{
	  currentAnswer
    threadName
    subThreadName
    mrLevel
		questionId
		questionText
		helpText
		answers {
			userId
			updatedAt
			answer
			objectiveEvidence
			assumptionsYes
			notesYes
			notesSkipped
			assumptionsSkipped
			likelihood
			consequence
			greatestImpact
			riskResponse
			mmpSummary
			risk
			who
			when
			what
			reason
			assumptionsNo
			notesNo
			documentation
			assumptionsNA
			notesNA
			revertedBy
		}
  }
	targetMRL
  threads
	currentMRL
	levelSwitching
	deskbookVersion
	files {
    id,
		url,
    questionId,
    name
	}
}
}
`

//needs to change to something like 'addAnAnswerToAQuestionMutation'
//included userId in args for the new Answer
//not sure what else to change currently
//probably want to return answers array /// most recent answer
export var updateQuestionMutation = gql`
mutation updateAssessment($_id: String!, $questionId: Int, $questionUpdates: QuestionInput, $answerUpdates: AnswerInput) {
	updateAssessment(_id: $_id, questionId: $questionId, questionUpdates: $questionUpdates, answerUpdates: $answerUpdates) {
		scope
    location
	}
	}
`
export var deleteAssessmentMutation = gql`
	mutation deleteAssessment($_id: String!){
		deleteAssessment(_id: $_id){
			id
		}
	}
`

export var getThreadsQuery = gql`
query {
	allThreadNames
}
`

export var updateTeamMembersMutation = gql`
	mutation addTeamMember($assessmentId: String, $teamMember: TeamMemberInput) {
		addTeamMember(assessmentId: $assessmentId,  teamMemberUpdates: $teamMember) {
			name
			email
			role
		}
	}
`

export var deleteFileMutation = gql`
  mutation deleteFile($assessmentId: String, $fileId: String) {
    deleteFile(assessmentId: $assessmentId, fileId: $fileId) {
      name
    }
  }
`
