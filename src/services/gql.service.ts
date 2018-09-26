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
		 $teamMembers: [String]
   ) {
     createAssessment(
       threads:    $threads,
       userId:     $userId,
       location:   $location,
       targetMRL:  $targetMRL,
       id:         $id,
       scope:      $scope,
       targetDate: $targetDate,
       deskbookVersion: $deskbookVersion,
			 name: $name,
			 teamMembers: $teamMembers,
			 levelSwitching: $levelSwitching
     ) {
          _id

       }
     }
`
