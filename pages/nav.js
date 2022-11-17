import Link from 'next/link'

export default function Nav() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="#">The Lodge at 1818 North</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="#">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="#">Link</Link>
                            </li>
                        </ul>
                    </div> */}
                    <div className='d-flex'>
                        <Link className="nav-link" href="#">Sign in</Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}