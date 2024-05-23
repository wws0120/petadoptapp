import Badge from '../../shared/ui/badge';

const Status = ({ status }) => {
  return (
    <>
      {status === 'ACTIVE' && (
        <Badge color={'text-emerald-600 bg-emerald-100'} text={status} />
      )}
      {status === 'INACTIVE' && (
        <Badge color={'text-red-500 bg-red-100'} text={status} />
      )}
    </>
  );
};

export default Status;
