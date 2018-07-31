import { Component } from '@angular/core';
import { NavParams,ViewController } from 'ionic-angular';


/**
 * Generated class for the ThreadsListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'threads-list',
  templateUrl: 'threads-list.html'
})
export class ThreadsListComponent {

	threads: any;
	chosen = [];
	emitter: any;
	threadsSelected: any;

  constructor(public navParams: NavParams, public viewController:  ViewController) {
		this.threads = this.navParams.get("allThreads");
		this.emitter = this.navParams.data.emitter;
		this.threadsSelected = this.navParams.data.threadsSelected;
		console.log(this.threadsSelected);
  }

	dismiss(item) {
		this.chosen.push(item);
	}

	emit(item) {
		this.emitter.emit(item);
		if (this.threadsSelected.includes(item.index)) {this.threadsSelected = this.threadsSelected.filter(a => a !== item.index)}
		else { this.threadsSelected.push(item.index)} 
	}

}
