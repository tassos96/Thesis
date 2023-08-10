import { Breadcrumb } from "antd";
import { Link, Route, useLocation } from "react-router-dom";
import { AppRoutes } from "../../helpers/AppConstants";
import Home from "../../pages/Home/Home";

export interface IAppBreadcrumbProps {
  path: string;
}

const breadcrumbNameMap: Record<string, string> = {
  '/login': 'Σύνδεση',
  '/signup': 'Εγγραφή',
  '/logout': 'Αποσύνδεση',
  '/account-info': 'Πληροφορίες Λογαριασμού',
  '/categories': 'Κατηγορίες',
  '/subcategories': 'Υπόκατηγορίες',
  '/questions': 'Ερωτήσεις',
  '/test': 'Τεστ',
  '/test/testInfo': 'Πληροφορίες Τεστ'
};

const AppBreadcrumb = (props: IAppBreadcrumbProps) => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return {
      key: url,
      title: <Link to={url}>{breadcrumbNameMap[url]}</Link>,
    };
  });

const breadcrumbItems = [
  {
    
    title: <Link to="/">Αρχική</Link>,
    key: 'home',
  },
].concat(extraBreadcrumbItems);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
    </>
  );
};


export default AppBreadcrumb;
