import { ColumnDef } from '@/ui/table';
import { TestTable } from '@/ui/testClasses/table';

interface MockData {
  id: number;
  name: string;
  age: number;
}

const columnDefs: ColumnDef<MockData>[] = [
  { header: 'ID', key: 'id' },
  { header: 'Name', key: 'name' },
  { header: 'Age', key: 'age' },
];

const resetMockData = (): MockData[] => {
  return [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    { id: 3, name: 'Bob', age: 35 },
    { id: 4, name: 'Alice', age: 40 },
    { id: 5, name: 'Tom', age: 45 },
    { id: 6, name: 'Sara', age: 50 },
    { id: 7, name: 'Mike', age: 55 },
    { id: 8, name: 'Emily', age: 28 },
    { id: 9, name: 'David', age: 42 },
    { id: 10, name: 'Lisa', age: 37 },
  ];
};

let mockData = resetMockData();

describe('Table', () => {
  let table: TestTable<MockData>;

  beforeEach(() => {
    const container = document.createElement('div');
    container.id = 'table-container';
    document.body.appendChild(container);

    table = new TestTable({ containerId: 'table-container', columnDefs });
  });

  afterEach(() => {
    const container = document.getElementById('table-container');
    if (container) {
      document.body.removeChild(container);
    }
    mockData = resetMockData();
  });

  describe('initialize()', () => {
    it('should render the table with data', () => {
      table.initialize(mockData);
      const tableElement = document.querySelector('table');
      expect(tableElement).not.toBeNull();
      expect(tableElement?.querySelectorAll('thead tr').length).toBe(1);
      expect(tableElement?.querySelectorAll('tbody tr').length).toBe(5); // default page size
    });
  });

  describe('addRow()', () => {
    it('should add a new row to state', () => {
      table.initialize(mockData);
      const initialDataLength = table.getData().length;
      const newRow = { id: 7, name: 'Mike', age: 55 };
      table.addRow(newRow);
      const updatedData = table.getData();
      expect(updatedData.length).toBe(initialDataLength + 1);
      expect(updatedData).toContainEqual(newRow);
    });
  });

  describe('updateRow()', () => {
    it.each([
      { index: 0, updatedRow: { id: 7, name: 'Mike', age: 55 } },
      { index: 2, updatedRow: { id: 3, name: 'Bobby', age: 37 } },
      {
        index: mockData.length - 1,
        updatedRow: { id: 8, name: 'Sarah', age: 45 },
      },
    ])(
      'should update an existing row in the state at index $index',
      ({ index, updatedRow }) => {
        table.initialize(mockData);
        table.updateRow(index, updatedRow);
        const updatedData = table.getData();
        expect(updatedData[index]).toEqual(updatedRow);
      }
    );

    it.each([-1, mockData.length + 1])(
      'should not update the state if the index %p is out of range',
      (invalidIndex) => {
        table.initialize(mockData);
        const initialData = [...table.getData()];
        const updatedRow = { id: 7, name: 'Mike', age: 55 };
        table.updateRow(invalidIndex, updatedRow);
        const updatedData = table.getData();
        expect(updatedData).toEqual(initialData);
      }
    );
  });

  describe('deleteRow()', () => {
    it.each([0, 2, mockData.length - 1])(
      'should delete a row from the state at index %i',
      (index) => {
        table.initialize(mockData);
        const initialData = [...table.getData()];
        table.deleteRow(index);
        const updatedData = table.getData();
        expect(updatedData.length).toBe(initialData.length - 1);
        expect(updatedData).not.toContainEqual(initialData[index]);
      }
    );

    it.each([-1, mockData.length])(
      'should not update the state if the index %p is out of range',
      (invalidIndex) => {
        table.initialize(mockData);
        const initialData = [...table.getData()];
        table.deleteRow(invalidIndex);
        const updatedData = table.getData();
        expect(updatedData).toEqual(initialData);
      }
    );

    it('should move to the previous page if deleting the last item on the current page', () => {
      const testData = [...mockData, { id: 11, name: 'Extra', age: 99 }];
      table.initialize(testData);
      table.setCurrentPage(3);

      table.deleteRow(0);

      expect(table.getCurrentPage()).toBe(2);
    });
  });

  describe('deleteAllRows()', () => {
    it('should delete all rows from the table', () => {
      table.initialize(mockData);
      table.deleteAllRows();
      expect(table.getData().length).toBe(0);
    });
  });

  describe('render()', () => {
    it('should render less than one page of data correctly', () => {
      const dataToDisplay = mockData.slice(0, 3);

      table.initialize([]);
      table.setData(dataToDisplay);

      const renderMethod = table.getRenderMethod();
      const paginatedData = table.getGetPaginatedDataMethod().call(table);
      renderMethod.call(table, paginatedData);

      const tableRows = document.querySelectorAll('tbody tr');
      expect(tableRows.length).toBe(3);
      const paginationContainer = document.querySelector('.table-pagination');
      expect(paginationContainer?.children.length).toBe(0); // No pagination controls
    });

    it('should render no data', () => {
      table.initialize([]);
      const renderMethod = table.getRenderMethod();
      const paginatedData = table.getGetPaginatedDataMethod().call(table);
      renderMethod.call(table, paginatedData);
      const tableRows = document.querySelectorAll('tbody tr');
      expect(tableRows.length).toBe(1); // Only "No results" row
      expect(tableRows[0].querySelector('td')?.textContent).toBe(
        'No results to display'
      );
      const paginationContainer = document.querySelector('.table-pagination');
      expect(paginationContainer?.children.length).toBe(0); // No pagination controls
    });

    it('should render more than one page of data correctly', () => {
      table.initialize([]);
      table.setData(mockData);

      const renderMethod = table.getRenderMethod();
      const paginatedData = table.getGetPaginatedDataMethod().call(table);
      renderMethod.call(table, paginatedData);

      const tableRows = document.querySelectorAll('tbody tr');
      expect(tableRows.length).toBe(5); // First 5 rows rendered
      const paginationContainer = document.querySelector('.table-pagination');
      expect(paginationContainer?.children.length).toBeGreaterThan(0); // Pagination controls rendered
    });
  });

  describe('renderHeader()', () => {
    it('should render the table header', () => {
      const renderHeaderMethod = table.getRenderHeaderMethod();
      const tableElement = document.createElement('table');
      renderHeaderMethod.call(table, tableElement);
      const headerCells = tableElement.querySelectorAll('thead tr td');
      expect(headerCells.length).toBe(3);
      expect(headerCells[0].textContent).toBe('ID');
      expect(headerCells[1].textContent).toBe('Name');
      expect(headerCells[2].textContent).toBe('Age');
    });
  });

  describe('renderRows()', () => {
    it.each([
      { tableLength: 1, data: [] },
      { tableLength: 3, data: mockData.slice(0, 3) },
    ])('should render the table rows', ({ tableLength, data }) => {
      const renderRowsMethod = table.getRenderRowsMethod();
      const tableElement = document.createElement('table');
      const tbody = document.createElement('tbody');
      tableElement.appendChild(tbody);
      renderRowsMethod.call(table, tbody, data);
      const tableRows = tableElement.querySelectorAll('tbody tr');
      expect(tableRows.length).toBe(tableLength);
    });
  });

  describe('renderPagination()', () => {
    it('should render the pagination UI', () => {
      const renderPaginationMethod = table.getRenderPaginationMethod();
      table.initialize(mockData);
      renderPaginationMethod.call(table);
      const paginationContainer = document.querySelector('.table-pagination');
      expect(paginationContainer).not.toBeNull();
    });
  });

  describe('renderNoData()', () => {
    it('should render the "No results to display" message', () => {
      const renderNoDataMethod = table.getRenderNoDataMethod();
      const tableElement = document.createElement('table');
      const tbody = document.createElement('tbody');
      tableElement.appendChild(tbody);
      renderNoDataMethod.call(table, tbody);
      const noDataCell = tableElement.querySelector('td');
      expect(noDataCell?.textContent).toContain('No results');
    });
  });

  describe('updatePagination()', () => {
    it('should not render pagination controls when not necessary', () => {
      table.initialize([]);
      table.getUpdatePaginationMethod().call(table);
      expect(document.querySelector('.table-pagination')?.children.length).toBe(
        0
      );
    });

    it('should render pagination controls when data exceeds page size', () => {
      table.initialize(mockData);
      table.getUpdatePaginationMethod().call(table);
      expect(
        document.querySelector('.table-pagination')?.children.length
      ).toBeGreaterThan(0);
    });
  });

  describe('nextPage()', () => {
    it('should navigate to the next page', () => {
      const testData = [...mockData, { id: 11, name: 'Extra', age: 99 }];
      table.initialize(testData);

      // Call nextPage() twice to go to page 3
      table.getNextPageMethod().call(table);
      table.getNextPageMethod().call(table);

      const tableRows = document.querySelectorAll('tbody tr');

      expect(tableRows.length).toBe(1);
      expect(table.getCurrentPage()).toBe(3);
    });
  });

  describe('prevPage()', () => {
    it('should navigate to the previous page', () => {
      table.initialize(mockData);
      table.getNextPageMethod().call(table);
      table.getPrevPageMethod().call(table);
      const tableRows = document.querySelectorAll('tbody tr');
      expect(tableRows.length).toBe(5);
    });
  });

  describe('getPaginatedData()', () => {
    it.each([
      { dataLength: 3, pageSize: 5, currentPage: 1, expectedLength: 3 },
      { dataLength: 6, pageSize: 5, currentPage: 1, expectedLength: 5 },
      { dataLength: 6, pageSize: 5, currentPage: 2, expectedLength: 1 },
      { dataLength: 10, pageSize: 5, currentPage: 1, expectedLength: 5 },
      { dataLength: 10, pageSize: 5, currentPage: 2, expectedLength: 5 },
      { dataLength: 10, pageSize: 3, currentPage: 1, expectedLength: 3 },
      { dataLength: 10, pageSize: 3, currentPage: 2, expectedLength: 3 },
      { dataLength: 10, pageSize: 3, currentPage: 4, expectedLength: 1 },
    ])(
      'should return $expectedLength results when data length is $dataLength, page size is $pageSize and current page is $currentPage',
      ({ dataLength, pageSize, currentPage, expectedLength }) => {
        table.initialize([]);
        table.setData(mockData.slice(0, dataLength));
        table.setPageSize(pageSize);
        table.setCurrentPage(currentPage);

        expect(table.getGetPaginatedDataMethod().call(table).length).toBe(
          expectedLength
        );
      }
    );
  });

  describe('getTotalPages()', () => {
    it.each([
      { dataLength: 3, pageSize: 5, expectedPages: 1 },
      { dataLength: 6, pageSize: 5, expectedPages: 2 },
      { dataLength: 10, pageSize: 2, expectedPages: 5 },
    ])(
      'should return $expectedPages when data length is $dataLength and page size is $pageSize',
      ({ dataLength, pageSize, expectedPages }) => {
        table.initialize([]);
        table.setData(mockData.slice(0, dataLength));
        table.setPageSize(pageSize);

        expect(table.getGetTotalPagesMethod().call(table)).toBe(expectedPages);
      }
    );
  });
});
