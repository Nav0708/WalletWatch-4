import { Injectable } from '@angular/core';
import { ReminderModel } from '../models/reminder'; // Path to reminder model
import { IReminderModel } from '../interfaces/IReminder'; // Path to reminder interface


@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  constructor() { }
}
