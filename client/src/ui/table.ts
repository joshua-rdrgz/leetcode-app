export interface ColumnDef<T extends object> {
  header: string;
  key: keyof T;
}

export interface TableOptions<T extends object> {
  containerId: string;
  columnDefs: ColumnDef<T>[];
  pageSize?: number;
}

export class Table<T extends object> {
  private container: HTMLElement;
  protected data: T[] = [];
  private columnDefs: ColumnDef<T>[];
  protected pageSize: number = 5;
  protected currentPage: number = 1;

  constructor(options: TableOptions<T>) {
    const { containerId, columnDefs, pageSize = 5 } = options;
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container element with ID "${containerId}" not found.`);
    }
    this.container = container;
    this.columnDefs = columnDefs;
    this.pageSize = pageSize;
  }

  initialize(data: T[]): Table<T> {
    this.data = data;

    this.container.innerHTML = '';

    const table = document.createElement('table');
    table.classList.add('table');

    this.renderHeader(table);

    const tbody = table.createTBody();
    tbody.classList.add('table__body');

    this.renderRows(tbody, this.getPaginatedData());

    this.container.appendChild(table);

    this.renderPagination();

    return this;
  }

  addRow(rowData: T) {
    // Add data to state
    this.data.unshift(rowData);

    // Rerender Table
    this.render(this.getPaginatedData());
  }

  updateRow(index: number, rowData: T) {
    if (index >= 0 && index < this.data.length) {
      this.data[index] = rowData;

      this.render(this.getPaginatedData());
    }
  }

  deleteRow(index: number) {
    if (index >= 0 && index < this.data.length) {
      this.data.splice(index, 1);

      const paginatedData = this.getPaginatedData();

      // move back a page if deleting item
      // results in current page having no items
      if (this.data.length > 0 && paginatedData.length === 0) {
        this.prevPage();
      }

      this.render(this.getPaginatedData());
    }
  }

  deleteAllRows() {
    this.data = [];
    this.currentPage = 1;
    this.render([]);
  }

  protected render(dataToDisplay: T[]) {
    const tbody = this.container.querySelector('tbody');
    if (!tbody) return;

    // Reset all table rows
    tbody.innerHTML = '';

    this.renderRows(tbody, dataToDisplay);

    this.updatePagination();
  }

  protected renderHeader(table: HTMLTableElement) {
    const thead = table.createTHead();
    thead.classList.add('table__header');

    const headerRow = thead.insertRow();
    headerRow.classList.add('table__header-row');

    for (const colDef of this.columnDefs) {
      const headerCell = headerRow.insertCell();
      headerCell.classList.add('table__header-cell');
      headerCell.textContent = colDef.header;
    }
  }

  protected renderRows(tbody: HTMLTableSectionElement, currentPageData: T[]) {
    if (currentPageData.length === 0) {
      this.renderNoData(tbody);
    } else {
      for (const rowData of currentPageData) {
        const row = tbody.insertRow();
        row.classList.add('table__row');

        for (const colDef of this.columnDefs) {
          const cell = row.insertCell();
          cell.classList.add('table__cell');
          cell.textContent = rowData[colDef.key]?.toString() || '';
        }
      }
    }
  }

  protected renderPagination() {
    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('table-pagination');
    this.container.appendChild(paginationContainer);

    this.updatePagination();
  }

  protected renderNoData(tbody: HTMLTableSectionElement) {
    tbody.innerHTML = '';

    const emptyRow = tbody.insertRow();

    const noResultsCell = emptyRow.insertCell();
    noResultsCell.classList.add('table__no-data-cell');
    noResultsCell.colSpan = this.columnDefs.length;
    noResultsCell.textContent = 'No results to display';
  }

  protected updatePagination() {
    const paginationContainer = document.querySelector('.table-pagination');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';

    if (this.data.length > this.pageSize) {
      // Create UI w/Info
      const infoContainer = document.createElement('div');
      infoContainer.classList.add('table-pagination__info-container');

      const infoPages = document.createElement('div');
      infoPages.classList.add('table-pagination__info-pages');
      infoPages.textContent = `${this.currentPage} of ${this.getTotalPages()}`;

      const totalResults = document.createElement('div');
      totalResults.classList.add('table-pagination__total-results');
      totalResults.textContent = `${this.data.length} total entries`;
      infoContainer.appendChild(totalResults);
      infoContainer.appendChild(infoPages);
      paginationContainer.appendChild(infoContainer);

      // Create Btn Container
      const btnContainer = document.createElement('div');
      btnContainer.classList.add('table-pagination__btn-container');

      // Create a "Previous" button
      const prevButton = document.createElement('button');
      prevButton.classList.add('btn', 'table-pagination__btn');
      prevButton.textContent = 'Previous';
      prevButton.addEventListener('click', () => this.prevPage());
      prevButton.disabled = this.currentPage === 1;
      btnContainer.appendChild(prevButton);

      // Create a "Next" button
      const nextButton = document.createElement('button');
      nextButton.classList.add('btn', 'table-pagination__btn');
      nextButton.textContent = 'Next';
      nextButton.addEventListener('click', () => this.nextPage());
      nextButton.disabled = this.currentPage === this.getTotalPages();
      btnContainer.appendChild(nextButton);

      paginationContainer.appendChild(btnContainer);
    }
  }

  protected nextPage() {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.render(this.getPaginatedData());
    }
  }

  protected prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.render(this.getPaginatedData());
    }
  }

  protected getPaginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.data.length);

    return this.data.slice(startIndex, endIndex);
  }

  protected getTotalPages() {
    return Math.ceil(this.data.length / this.pageSize);
  }
}
