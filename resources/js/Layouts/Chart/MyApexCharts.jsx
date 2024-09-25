
import Chart from "react-apexcharts";
export default function MyApexCharts(props) {

    const { myType, myWidth, myCategories, myData, myChartTitle } = props;
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    const randomColors = myData.map(() => getRandomColor());

    const mySeries = myData.map((item) => ({
        name: `${item.name}`, // Create a name for each series
        type: myType ? myType : 'bar', // Bar series type
        data: item.data                   // Assign the inner array as data
    }));


    const state = {
        options: {
            chart: {
                id: "basic-bar"
            },
            colors: randomColors,
            xaxis: {
                categories: myCategories ?? [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            }
        },
        series: mySeries
        // [
        //     {
        //         name: "series-1",
        //         data: myData ?? [30, 40, 45, 50, 49, 60, 70, 91]
        //     }
        // ]
    };



    return (
        <>
            <div>
                <div className="text-2xl font-semibold text-center text-gray-700">{myChartTitle ? myChartTitle : 'Judul Chart'}</div>
                <Chart
                    options={state.options}
                    series={state.series}
                    type={myType ? myType : 'bar'}
                    width={myWidth ? myWidth : "100%"}
                />
            </div>
        </>

    );
}
