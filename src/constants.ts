import gql from "graphql-tag";

const getOneAssessmentQuery = gql`
query assessment($id: Int!){
	assessment(id: $id) {
		questions {
			threadName
		}
	}
}
`
