import { connect } from "react-redux";

const ErrorPage = () => {
    return (
        <div>
            <h2 className="text-center">Page not found</h2>
        </div>
    );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(ErrorPage);
