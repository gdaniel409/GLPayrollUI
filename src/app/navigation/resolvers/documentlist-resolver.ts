import { ResolveFn } from '@angular/router';
import { DocumentsHttpService } from '../../core/services/documents/documents-service';
import { inject } from '@angular/core';
import { DocumentModel } from '../../models/DocumentModel';

export const documentlistResolver: ResolveFn<DocumentModel[]> = (route, state) => {

  const http = inject(DocumentsHttpService);
  const employeeId = Number(route.paramMap.get('id'));
  return http.getAncillary(employeeId);

}
