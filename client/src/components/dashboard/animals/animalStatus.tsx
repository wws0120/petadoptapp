import Badge from '../../shared/ui/badge';

const Status = ({ status }) => {
  return (
    <>
      {(status === 'PROGRESS' || status === 'Inactive') && (
        <Badge color={'text-yellow-600 bg-yellow-100'} text={status} />
      )}
      {status === 'AVAILABLE' && (
        <Badge color={'text-emerald-600 bg-emerald-100'} text={status} />
      )}
      {status === 'UNAVAILABLE' && (
        <Badge color={'text-red-500 bg-red-100'} text={status} />
      )}
      {status === 'ADOPTED' && (
        <Badge color={'text-blue-500 bg-blue-100'} text={status} />
      )}
      {status === 'RESERVED' && (
        <Badge color={'text-violet-500 bg-violet-100'} text={status} />
      )}
      {status === 'PASSED' && (
        <Badge color={'text-slate-600 bg-slate-100'} text={status} />
      )}
    </>
  );
};

export default Status;
