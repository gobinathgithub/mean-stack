import { Pipe, PipeTransform } from '@angular/core';
import { DateFormatPipe } from '../pipes/date-format.pipe';
import { NgbDateFRParserFormatter } from '../app/ngb-date-for-parser-formatter'

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {
    constructor(private _date: DateFormatPipe, private _dateFormat: NgbDateFRParserFormatter) {}
    public taskId: Array<any> = [];
    private result: Array<any> = [];
    transform(items: any[], taskName: string, parentTaskName: string, priortyFrom: number, priortyTo: number,
        fromDate: any, toDate: any): any {
        this.taskId = [];
        if (items && items.length) {
            this.result = [];
            items.filter(item => {
                if (parentTaskName && item.task.toLowerCase().indexOf(parentTaskName.toLowerCase()) !== -1) {
                    this.result.push(item._id);
                }
            });
            items.filter(item => {
                this.result.filter(task => {
                    if (task === item.parent) {
                        this.taskId.push(item);
                    }
                });
            });
            if (parentTaskName) {
                items = this.taskId;
            }
            return items.filter(item => {
                if (taskName && item.task.toLowerCase().indexOf(taskName.toLowerCase()) === -1) {
                    return false;
                }
                if (parentTaskName && item.task.toLowerCase().indexOf(parentTaskName.toLowerCase()) === -1) {
                    return true;
                }
                if (priortyFrom && item.priorty && priortyTo) {
                    if (priortyFrom >= (item.priorty + 1) || priortyTo <= (item.priorty - 1)) {
                        return false;
                    }
                }
                let stDate = this._dateFormat.format(fromDate);
                let edDate = this._dateFormat.format(toDate);
                if (stDate && this._date.transform(item.fromDate, 'yyyy/MM/dd').indexOf(stDate) === -1) {
                        return false;
                }
                if (edDate && this._date.transform(item.toDate, 'yyyy/MM/dd').indexOf(edDate) === -1) {
                        return false;
                }
                return true;
            });
        } else {
            return items;
        }
    }
}
