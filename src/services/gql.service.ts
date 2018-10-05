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
		 teamMembers
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
		 $teamMembers: [String]
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
			 teamMembers: $teamMembers,
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
		objectiveEvidence
		assumptionsYes
		notesYes
		notesSkipped
		assumptionsSkipped
		who
		when
		technical
		cost
		schedule
		what
		reason
		assumptionsNo
		notesNo
		documentation
		assumptionsNA
		notesNA
		helpText
  }
	targetMRL
	currentMRL
	levelSwitching
	files {
		url
	}
}
}
`

export var updateQuestionMutation = gql`
mutation updateAssessment($_id: String!, $questionId: Int, $updates: QuestionUpdate) {
	updateAssessment(_id: $_id, questionId: $questionId, updates: $updates) {
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
