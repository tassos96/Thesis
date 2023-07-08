import { Breadcrumb } from "antd";

export interface IAppBreadcrumbProps {
  path: string;
}

const AppBreadcrumb = (props: IAppBreadcrumbProps) => {

  const breadcrumbItems = props.path.split("/");
  const breadcrumb = breadcrumbItems.map((item, index) => {
    return <Breadcrumb.Item key={"breabcrump_key_"+index}>{item}</Breadcrumb.Item>;
  });
  
  return (
    <>
      {breadcrumb?.length && (
        <Breadcrumb style={{ margin: "16px 0" }}>{breadcrumb}</Breadcrumb>
      )}
    </>
  );
};

export default AppBreadcrumb;
