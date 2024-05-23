import Badge from '../../shared/ui/badge';

const Status = ({ status }) => {
  return (
    <>
      {status === 'PENDING' && (
        <Badge color={'text-yellow-600 bg-yellow-100'} text={status} />
      )}
      {status === 'ACTIVE' && (
        <Badge color={'text-emerald-600 bg-emerald-100'} text={status} />
      )}
      {status === 'INACTIVE' && (
        <Badge color={'text-pink-500 bg-pink-100'} text={status} />
      )}
      {status === 'BANNED' && (
        <Badge color={'text-red-500 bg-red-100'} text={status} />
      )}
      {status === 'SUSPENDED' && (
        <Badge color={'text-orange-600 bg-orange-100'} text={status} />
      )}
      {status === 'DELETED' && (
        <Badge color={'text-slate-600 bg-slate-100'} text={status} />
      )}
    </>
  );
};

export default Status;
