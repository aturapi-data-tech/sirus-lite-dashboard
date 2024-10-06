import { Card } from "flowbite-react";
import { BsFillCloudLightningRainFill, BsFillCloudDrizzleFill, BsFillCloudSunFill } from "react-icons/bs";

export default function MyCard({ children, ...props }) {
    const { cardName = 'Card Name', data } = props;


    const cardStatus = data.metadata.code;
    const errorMessage = data.metadata.message;
    const responseTime = data.metadata.requestTransferTime;


    const LastUpdate = () => {
        const date = new Date();

        // Get day, month, year, hours, minutes, and seconds
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0'); // 24-hour format
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        // Combine into DD/MM/YYYY HH24:MI:SS format
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    const MyLogoStatus = (props) => {
        const { cardStatus } = props;
        if (cardStatus != 200) { return (<BsFillCloudLightningRainFill className="w-6 h-6 ml-2 -mr-1 text-red-600" />); }
        if (cardStatus == 200 && responseTime > 3) { return (<BsFillCloudDrizzleFill className="w-6 h-6 ml-2 -mr-1 text-yellow-400" />); }
        if (cardStatus == 200 && responseTime < 3) { return (<BsFillCloudSunFill className="w-6 h-6 ml-2 -mr-1 text-green-600" />); }

    }




    const cardBgColor = (cardStatus) => {
        if (cardStatus != 200) { return ('bg-red-100 text-red-700'); }
        if (cardStatus == 200 && responseTime > 3) { return ('bg-yellow-100 text-yellow-500'); }
        if (cardStatus == 200 && responseTime < 3) { return ('bg-green-100 text-green-500'); }
    }

    return (
        <Card className={cardBgColor(cardStatus)}>
            <h5 className="text-2xl font-bold tracking-tight text-center dark:text-white">
                {cardName}
            </h5>
            <div className='flex flex-col justify-center'>
                <div className="flex justify-center">
                    <MyLogoStatus cardStatus={cardStatus} responseTime={responseTime} />

                </div>

                <p className="font-normal text-center text-gray-700 dark:text-gray-400">
                    {`(${cardStatus || '-'}) ${errorMessage || '-'} `}
                </p>
                <p className="font-semibold text-center text-gray-700 dark:text-gray-400">
                    {`${(responseTime.toFixed(3)) || 0} s `}
                </p>
                <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400">
                    Last Update {LastUpdate()}
                </p>


                {children}
            </div>
        </Card>
    );
}



