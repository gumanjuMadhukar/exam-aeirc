import { AddDeductRequest } from 'components/payroll/EditPayrollSalary';
import {
  FilterParamsReq,
  WithheldAndRevertReqType
} from 'pages/admin/payroll/payroll-summary';
import http from 'utils/http';

export function getCurrentPayrollInfo() {
  return http({
    url: '/salary/current-payroll-info',
    method: 'get'
  });
}

export function getCurrentPayroll(query: FilterParamsReq) {
  return http({
    url: '/salary/current-payroll',
    params: query,
    method: 'get'
  });
}

export function addDeductSalary(data: AddDeductRequest) {
  return http({
    url: '/salary/add-deduct',
    method: 'post',
    data
  });
}

export function withHeldAndRevertSalary(data: WithheldAndRevertReqType) {
  return http({
    url: '/salary/withheld',
    method: 'patch',
    data
  });
}

export function publishPayroll() {
  return http({
    url: '/salary/publish-payroll',
    method: 'patch'
  });
}
