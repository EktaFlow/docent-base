import gql from "graphql-tag";
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })

export const assessmentsDemo = gql`
  query assessments($userId: String) {
    assessments(userId: $userId) {
      id
      name
      questions {
        files {
          id
          questionId
          name
        }
      }
    }
  }
`

<<<<<<< HEAD
=======
export const fileUploadQuestion = gql`
  query question(
    $questionId: Int
    $assessmentId: String
  ) {
    question(
      questionId: $questionId
      assessmentId: $assessmentId
    ) {
      questionId
      questionText
      helpText
      criteriaText
      threadName
      subThreadName
      files {
        id
        questionId
        name
        url
      }
      
    }
  }

`

>>>>>>> f4cebe37c8f18a655fc9cd86b08cec9c5150cbf6
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
      questions {
        mrLevel
        answers {
          answer
        }
        files {
          id
          questionId
          name
        }
      }
      teamMembers
    }
  }
`;
export var createAssessmentMutation = gql`
  mutation createAssessment(
    $threads: [Int]
    $location: String
    $targetMRL: Int
    $id: Int
    $scope: String
    $targetDate: Date
    $deskbookVersion: String
    $name: String
    $levelSwitching: Boolean
    $userId: String
    $userEmail: String
    $teamMembers: [String]
    $schema: String
  ) {
    createAssessment(
      threads: $threads
      userId: $userId
      userEmail: $userEmail
      location: $location
      targetMRL: $targetMRL
      id: $id
      scope: $scope
      targetDate: $targetDate
      deskbookVersion: $deskbookVersion
      name: $name
      teamMembers: $teamMembers
      levelSwitching: $levelSwitching
      schema: $schema
    ) {
      _id
      deskbookVersion
    }
  }
`;

export var questionPageAssessmentQuery = gql`
  query assessment($_id: String) {
    assessment(_id: $_id) {
      questions {
        files {
          id
          url
          questionId
          name
        }
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
          # revertedBy
        }
      }
      targetMRL
      threads
      currentMRL
      levelSwitching
      deskbookVersion
    }
  }
`;


//needs to change to something like 'addAnAnswerToAQuestionMutation'
//included userId in args for the new Answer
//not sure what else to change currently
//probably want to return answers array /// most recent answer
export var updateQuestionMutation = gql`
  mutation updateAssessment(
    $_id: String!
    $questionId: Int
    $questionUpdates: QuestionInput
    $answerUpdates: AnswerInput
  ) {
    updateAssessment(
      _id: $_id
      questionId: $questionId
      questionUpdates: $questionUpdates
      answerUpdates: $answerUpdates
    ) {
      scope
      location
    }
  }
`;
export var deleteAssessmentMutation = gql`
  mutation deleteAssessment($_id: String!) {
    deleteAssessment(_id: $_id) {
      id
    }
  }
`;

export var getThreadsQuery = gql`
  query {
    allThreadNames
  }
`;

export var updateTeamMembersMutation = gql`
  mutation addTeamMember($assessmentId: String, $teamMembers: [String]) {
    addTeamMember(assessmentId: $assessmentId, teamMembers: $teamMembers) {
      name
      email
      role
    }
  }
`;



export const addFileToQuestionMutation = gql`
  mutation addFile($assessmentId: String, $questionId: Int, $url: String, $name: String) {
    addFile(assessmentId: $assessmentId, questionId: $questionId, url: $url, name: $name) {
      name
    }
  }
`;

export var deleteFileMutation = gql`
<<<<<<< HEAD
  mutation deleteFile($questionId: Int, $fileId: String) {
    deleteFile(questionId: $questionId, fileId: $fileId) {
=======
  mutation deleteFile($questionId: Int!, $assessmentId: String!, $name: String) {
    deleteFile(questionId: $questionId, assessmentId: $assessmentId, name: $name) {
>>>>>>> f4cebe37c8f18a655fc9cd86b08cec9c5150cbf6
      name
    }
  }
`;
