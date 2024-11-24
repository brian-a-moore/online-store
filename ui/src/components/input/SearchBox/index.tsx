import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { SearchUsersBody, SearchUsersQuery, SearchUsersResponse } from '../../../../../api/src/types/api';
import { HTTP_METHOD } from '../../../constants';
import useApi from '../../../hooks/useApi';
import useDebounce from '../../../hooks/useDebounce';
import { Card } from '../../container';
import { EmptyText } from '../../typography';

type SearchBoxProps = {
  storeId: string;
};

const SearchBox: React.FC<SearchBoxProps> = ({ storeId }) => {
  const [search, setSearch] = useState<string>('');
  const [field, setField] = useState<'name' | 'email'>('name');
  const [users, setUsers] = useState<SearchUsersResponse['users']>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const debouncedSearch = useDebounce(search, 1000);

  const { error, response } = useApi<SearchUsersBody, SearchUsersQuery, SearchUsersResponse>(
    {
      url: `/admin/user/search`,
      method: HTTP_METHOD.GET,
      params: { storeId, search: debouncedSearch, field, page: '1' },
    },
    { isAutoTriggered: debouncedSearch.length > 2 },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  useEffect(() => {
    if (response?.users) {
      setUsers(response.users);
    }
  }, [response?.users]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value.length === 0) {
      setUsers([]);
    }
  };

  return (
    <div>
      <input
        type="search"
        className={`w-full h-12 px-4 rounded`}
        value={search}
        onChange={onChange}
        placeholder="Search Users"
        ref={inputRef}
      />
      <ListPopup users={users} inputRef={inputRef} search={debouncedSearch} />
    </div>
  );
};

export default SearchBox;

type ListPopupProps = {
  users: SearchUsersResponse['users'];
  search: string;
  inputRef: React.RefObject<HTMLInputElement>;
};

const ListPopup: React.FC<ListPopupProps> = ({ inputRef, search, users }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number; width: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const updatePosition = () => {
    if (inputRef.current) {
      const { bottom, left, width } = inputRef.current.getBoundingClientRect();
      setPosition({ top: bottom, left, width });
      setIsVisible(true);
    }
  };

  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);

    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node) || !popupRef.current?.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    const handleClickInside = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousedown', handleClickOutside);
    inputRef.current?.addEventListener('focus', handleClickInside);

    return () => {
      window.removeEventListener('resize', updatePosition);
      document.removeEventListener('mousedown', handleClickOutside);
      inputRef.current?.removeEventListener('focus', handleClickInside);
    };
  }, [inputRef]);

  const highlightText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span className="bg-sky-100 text-sky-600 font-semibold" key={index}>
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </>
    );
  };

  if (!isVisible || (!position || search.length === 0)) return null;

  return ReactDOM.createPortal(
    <div
      ref={popupRef}
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        width: position.width,
        zIndex: 1000,
      }}

    >
      <Card className="!p-0 !gap-0">
        {users.length ? (
          <>
            {users.map((user) => (
              <button key={user.id} onClick={() => {}} className="flex gap-4 p-4 items-center border-b-2 !text-left">
                <p className="flex-1">{highlightText(user.name, search)}</p>
                <p className="text-sm opacity-50">{user.email}</p>
              </button>
            ))}
          </>
        ) : (
          <EmptyText className='p-4 text-sm'>No users found</EmptyText>
        )}
      </Card>
    </div>,
    document.body,
  );
};
