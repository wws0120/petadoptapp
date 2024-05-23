import Badge from '../../shared/ui/badge';

const Status = ({ status }) => {
  return (
    <>
      {status === 'PENDING_APPROVAL' && (
        <Badge color={'text-yellow-600 bg-yellow-100'} text={status} />
      )}
      {status === 'APPROVED' && (
        <Badge color={'text-emerald-600 bg-emerald-100'} text={status} />
      )}
      {status === 'REJECTED' && (
        <Badge color={'text-red-500 bg-red-100'} text={status} />
      )}
      {status === 'IN_PROGRESS' && (
        <Badge color={'text-blue-500 bg-blue-100'} text={status} />
      )}
      {status === 'CANCELLED' && (
        <Badge color={'text-slate-600 bg-slate-100'} text={status} />
      )}
    </>
  );
};

export default Status;
