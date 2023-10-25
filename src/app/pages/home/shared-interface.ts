// shared.ts
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { NzCustomColumn } from 'ng-zorro-antd/table';

export interface CustomRow {
    key: string;
    name: string;
    gender: 'male' | 'female';
    age: number;
    address: string;
}

export interface CustomColumn extends NzCustomColumn {
    name: string;
    required?: boolean;
    position?: 'left' | 'right';
}
