import dayjs from 'dayjs';

function DonationItem({ item }) {
  return (
    <tr className="bg-white border-b   hover:bg-gray-100  ">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900   whitespace-nowrap"
      >
        <div className="flex items-center">
          <div className="">
            <span className="capitalize block text-gray-800 font-semibold">
              {item.donorEmail}
            </span>
          </div>
        </div>
      </th>
      <td className="px-6 py-4">{item.type}</td>
      <td className="px-6 py-4">
        {dayjs(item.createdAt).format('DD-MM-YYYY')}
      </td>
      <td className="px-6 py-4">{`$${item.amount}`}</td>
    </tr>
  );
}

export default DonationItem;
