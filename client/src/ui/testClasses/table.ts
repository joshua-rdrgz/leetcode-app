import { Table } from '../table';

export class TestTable<T extends object> extends Table<T> {
  getData() {
    return this.data;
  }

  setData(data: T[]) {
    this.data = data;
  }

  getCurrentPage() {
    return this.currentPage;
  }

  setCurrentPage(pageNum: number) {
    this.currentPage = pageNum;
  }

  setPageSize(pageSize: number) {
    this.pageSize = pageSize;
  }

  getRenderMethod() {
    return super.render;
  }

  getRenderHeaderMethod() {
    return super.renderHeader;
  }

  getRenderRowsMethod() {
    return super.renderRows;
  }

  getRenderPaginationMethod() {
    return super.renderPagination;
  }

  getRenderNoDataMethod() {
    return super.renderNoData;
  }

  getUpdatePaginationMethod() {
    return super.updatePagination;
  }

  getNextPageMethod() {
    return super.nextPage;
  }

  getPrevPageMethod() {
    return super.prevPage;
  }

  getGetPaginatedDataMethod() {
    return super.getPaginatedData;
  }

  getGetTotalPagesMethod() {
    return super.getTotalPages;
  }
}
