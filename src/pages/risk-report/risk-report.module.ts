import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RiskReportPage } from './risk-report';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    RiskReportPage,
  ],
  imports: [
    IonicPageModule.forChild(RiskReportPage),
  ],
  entryComponents: [
    RiskReportPage
  ],
  exports: [
    RiskReportPage
  ]
})
export class RiskReportPageModule {}
