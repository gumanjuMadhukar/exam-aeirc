import http from 'utils/http';
import { FilterParams } from 'pages/admin/leaves';
export interface LeaveTypeResponse {
  id: string;
  name: string;
  alias: string;
  alloted_days: number;
  max_carryover: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Employee {
  id: string;
  name: string;
  dob?: any;
  address?: any;
  phone_number?: any;
  gender?: any;
  marital_status: boolean;
  joined_date?: any;
  bank_name?: any;
  bank_account_number?: any;
  pan_number?: any;
}

export interface LeaveStatus {
  id: string;
  name: string;
  alias: string;
}

export interface LeaveType {
  id: string;
  name: string;
  alias: string;
  alloted_days: number;
  max_carryover: number;
}

export interface LeaveResponse {
  id: string;
  reason: string;
  reject_reason?: any;
  requested_on: Date;
  start_date: Date;
  end_date: Date;
  shift: string;
  employee: Employee;
  leaveStatus: LeaveStatus;
  leaveType: LeaveType;
}

export interface TakenLeaves {
  leaveDetails_shift: string;
  leaveType_name: string;
  leaveType_alloted_days: number;
  leaves_taken: number;
  type: string;
}

export interface LeaveType {
  id: string;
  name: string;
  alias: string;
  alloted_days: number;
  max_carryover: number;
}

export interface PrevLeavesRemaining {
  id: string;
  days: number;
  leaveType: LeaveType;
}

export interface LeaveDetailsResponse {
  takenLeaves: TakenLeaves[] | [];
  prevLeavesRemaining: PrevLeavesRemaining[] | [];
  leavesTotal: [];
}

export interface LeaveDeclineBody {
  leaveId: string;
  reject_reason: string;
}

export function applyLeave(data: ApplyLeavesPayload) {
  return http({
    url: '/leave/apply',
    method: 'post',
    data
  });
}

export function leaveTypes(): Promise<{
  data: { data: LeaveTypeResponse[] };
}> {
  return http({
    url: '/leave/types',
    method: 'get'
  });
}

export function leave(filterParams: FilterParams): Promise<{
  data: { data: LeaveResponse[] | [] };
}> {
  return http({
    url: '/leave',
    params: filterParams,
    method: 'get'
  });
}

export function leaveDetails(): Promise<{
  data: { data: LeaveDetailsResponse };
}> {
  return http({
    url: '/leave/details',
    method: 'get'
  });
}

export function getAllLeaves(filterParams: FilterParams) {
  return http({
    url: '/leave/all',
    params: filterParams,
    method: 'get'
  });
}

export function approveLeave(id: number) {
  return http({
    url: `/leave/approve/${id}`,
    method: 'patch'
  });
}

export function declineLeave(data: LeaveDeclineBody) {
  return http({
    url: `/leave/reject/${data?.leaveId}`,
    method: 'patch',
    data
  });
}

export function deleteLeave(id: number | string) {
  return http({
    url: `/leave/leave/${id}`,
    method: 'delete'
  });
}

export function leaveStatuses() {
  return http({
    url: '/leave/statuses',
    method: 'get'
  });
}

export function leaveAllDetails() {
  return http({
    url: '/leave/all/details',
    method: 'get'
  });
}
