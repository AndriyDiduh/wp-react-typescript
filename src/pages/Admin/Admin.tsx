import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminHeader from '../../components/AdminHeader';
import AdminSidebarNav from 'components/AdminSidebarNav/AdminSidebarNav';
import { Route, useLocation } from 'react-router-dom';
import Introduction from './Introduction';
import Posts from './Posts/Posts';
import Edit from './Post/Edit/Edit';
import AddNew from './AddNew/AddNew';
import AccountInfo from './AccountInfo';
import { currentUserSelector } from 'selectors';
import { unAuthUser } from 'actions';
import './Admin.css';

type AdminProps = {
  basePath: string;
};

const Admin: React.FC<AdminProps> = ({ basePath }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  const { pathname } = useLocation();

  const unAuthUserCallback = React.useCallback(() => {
    dispatch(unAuthUser());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <AdminHeader currentUser={currentUser} unAuthUser={unAuthUserCallback} />
      <div className="admin-content">
        <AdminSidebarNav basePath={basePath} pathName={pathname} />
        <div className="container-fluid">
          <Route path={basePath} exact component={Introduction} />
          <Route path={`${basePath}/posts`} component={Posts} />
          <Route path={`${basePath}/post/edit/:id`} component={Edit} />
          <Route path={`${basePath}/add-new`} component={AddNew} />
          <Route path={`${basePath}/account`} component={AccountInfo} />
        </div>
      </div>
    </div>
  );
};

export default Admin;
