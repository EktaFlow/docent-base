import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'threads-list',
  templateUrl: './threads-list.component.html',
  styleUrls: ['./threads-list.component.scss'],
})
export class ThreadsListComponent implements OnInit {
  //vars threads: any;
	chosen = [];
	emitter: any;
	threadsSelected: any;
	threads: any;
	assessmentId: any;

  constructor(
		public navParams: NavParams,
		private activatedRoute: ActivatedRoute
	) {
		 this.threads = this.activatedRoute.snapshot.paramMap.get('allThreads');
		 this.emitter = this.activatedRoute.snapshot.paramMap.get('emitter');
		 this.assessmentId = this.activatedRoute.snapshot.paramMap.get('threadsSelected');
  }

	ngOnInit(){

	}

	dismiss(item) {
		this.chosen.push(item);
	}

	handleClick(name, event) {
		this.emit(name);
		name.selected ? name.selected = false : name.selected = true
	}

	emit(item) {
		this.emitter.emit(item);
		if (this.threadsSelected.includes(item.index)) {this.threadsSelected = this.threadsSelected.filter(a => a !== item.index)}
		else { this.threadsSelected.push(item.index)}
	}

}
