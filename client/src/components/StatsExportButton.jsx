import React from 'react';
import { getOverviewApi, getBarChartDataApi, getLatestBudgetsApi, getLatestExpensesApi } from '../api/stats.api';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const StatsExportButton = () => {

    const fetchData = async () => {
        try {
            const overview = await getOverviewApi();
            const barChartData = await getBarChartDataApi();
            const latestBudgets = await getLatestBudgetsApi();
            const latestExpenses = await getLatestExpensesApi();
            console.log('Data Fetched', { overview, barChartData, latestBudgets, latestExpenses })

            return { overview, barChartData, latestBudgets, latestExpenses };
        } catch (error) {
            console.error('Error fetching data', error);
            return null;
        }
    };


    const transformDataForSheet = (data) => {
        if (Array.isArray(data)) {
            return data;
        } else if (typeof data === 'object') {
            return [data];
        }
        return [];
    };



    const exportToExcel = async () => {
        console.log('Export button clicked');
        const data = await fetchData();

        if (data) {
            console.log('Exporting to Excel');
            try {
                const workbook = XLSX.utils.book_new();

                const overviewSheetData = transformDataForSheet(data.overview);
                const barChartDataSheetData = transformDataForSheet(data.barChartData);
                const latestBudgetsSheetData = transformDataForSheet(data.latestBudgets);
                const latestExpensesSheetData = transformDataForSheet(data.latestExpenses);

                const overviewSheet = XLSX.utils.json_to_sheet(overviewSheetData);
                const barChartDataSheet = XLSX.utils.json_to_sheet(barChartDataSheetData);
                const latestBudgetsSheet = XLSX.utils.json_to_sheet(latestBudgetsSheetData);
                const latestExpensesSheet = XLSX.utils.json_to_sheet(latestExpensesSheetData);

                XLSX.utils.book_append_sheet(workbook, overviewSheet, 'Overview');
                XLSX.utils.book_append_sheet(workbook, barChartDataSheet, 'Bar Chart Data');
                XLSX.utils.book_append_sheet(workbook, latestBudgetsSheet, 'Latest Budgets');
                XLSX.utils.book_append_sheet(workbook, latestExpensesSheet, 'Latest Expenses');

                const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });

                saveAs(dataBlob, 'stats_data.xlsx');
                console.log('Excel exported successfully');
            } catch (exportError) {
                console.error('Error exporting to Excel', exportError);
            }
        }

    };

    return (
        <button onClick={exportToExcel}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >Export to Excel</button>
    );
};

export default StatsExportButton;
