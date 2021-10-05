import { Injectable, NgModule } from "@angular/core";
import { Storage } from '@ionic/storage';

@NgModule()
@Injectable()
export class DocentElectronService{
  constructor(){}

  drillQuestions(threads){
    var questions = [];
		console.log(threads);
	threads.forEach(thread => {
	var threadId	 = thread.threadId,
		threadName = thread.name,
		  threadHelp = thread.helpText;

			thread.subThreads.forEach( z => {
				var subThreadName = z.name,
		    subThreadId				= z.subThreadId;

				z.subThreadLevels.forEach(b => {
					var subThreadLevelId = b.subThreadLevelId,
					mrLevel      = b.level,
					criteriaText = b.criteriaText,
					helpText     = b.helpText;

					// TODO: remove this level conditional		//
					// need all qs in assessment 17-08-18 mpf //

						b.questions.forEach( c => {
							questions.push({
								threadId,
								threadName,
								threadHelp,
								subThreadName,
								subThreadId,
								subThreadLevelId, // we don't use this one.
								mrLevel,
								criteriaText,
								helpText,
								questionId:		c.questionId,
								questionText: c.questionText,
								answers: [],
							});
						})

				});
			})
});
	return questions;
  }
}
