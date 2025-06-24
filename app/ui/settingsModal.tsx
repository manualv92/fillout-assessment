export default function SettingsModal({
  onClose,
  onAction,
  item
}: {
  onClose: () => void;
  onAction: (action: string, item: string) => void;
  item: string;
}) {
  const actions = ['Set as first Page', 'Rename', 'Copy', 'Duplicate', 'Delete'];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-64 shadow-xl space-y-2">
        <h3 className="font-semibold text-lg mb-2">Settings for "{item}"</h3>
        {actions.map((action) => (
          <button
            key={action}
            className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
            onClick={() => onAction(action, item)}
          >
            {action}
          </button>
        ))}
        <button
          className="mt-2 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}