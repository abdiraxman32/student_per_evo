<?php
session_start();
if (!isset($_SESSION['username'])) {
    header('Location:login.php');
    die();
}

?>
<?php

include 'include/header.php';

?>
<!-- Layout wrapper -->
<div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
        <!-- sidebar -->
        <?php
        include 'include/sidebar.php';

        ?>
        <!-- / sidebar -->

        <!-- Layout container -->
        <div class="layout-page">
            <!-- Navbar -->
            <?php
            include 'include/nav.php';
            ?>
            <!-- / Navbar -->

            <!-- Content wrapper -->
            <div class="content-wrapper">
                <!-- Content -->

                <div class="container mt-4">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="text-end">
                                    <button type="button" class="btn btn-success  m-2" data-bs-toggle="modal" data-bs-target="#teachermodal">
                                        Add teacher
                                    </button>
                                </div>
                                <h5 class="card-header">Teachers Table</h5>
                                <div class="table-responsive text-nowrap" id="teacherTable">
                                    <table class="table">
                                        <thead class="table-light">

                                        </thead>

                                        <tbody>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Content -->



                <div class="modal fade" id="teachermodal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalCenterTitle">Teachers Modal</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">

                                <form id="teacherForm">
                                    <input type="hidden" name="update_id" id="update_id">
                                    <div class="row">

                                        <div class="col-sm-6 mt-3">
                                            <div class="form-group">
                                                <label for="">full_name</label>
                                                <input type="text" name="full_name" id="full_name" class="form-control" required>
                                            </div>

                                        </div>



                                        <div class="col-sm-6 mt-3">
                                            <div class="form-group">
                                                <label for="">phone</label>
                                                <input type="number" name="phone" id="phone" class="form-control" required>
                                            </div>

                                        </div>

                                        <div class="col-sm-6 mt-3">
                                            <div class="form-group">
                                                <label for="">city</label>
                                                <input type="text" name="city" id="city" class="form-control" required>
                                            </div>

                                        </div>

                                        <div class="col-sm-6 mt-3">
                                            <div class="form-group">
                                                <label for="">state</label>
                                                <input type="text" name="state" id="state" class="form-control" required>
                                            </div>

                                        </div>



                                        <div class="col-sm-6 mt-3">
                                            <div class="form-group">
                                                <label for="">branch</label>
                                                <select name="branch_id" id="branch_id" class="form-control">

                                                </select>

                                            </div>
                                        </div>

                                        <div class="col-sm-6 mt-3">
                                            <div class="form-group">
                                                <label for="">job</label>
                                                <select name="job_title_id" id="job_title_id" class="form-control">

                                                </select>

                                            </div>
                                        </div>




                                    </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button type="submit" class="btn btn-primary">Save changes</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>



                <!-- Footer -->

                <?php

                include 'include/footer.php';
                ?>
                <!-- / Footer -->

                <div class="content-backdrop fade"></div>
            </div>
            <!-- Content wrapper -->
        </div>
        <!-- / Layout page -->
    </div>

    <!-- Overlay -->
    <div class="layout-overlay layout-menu-toggle"></div>
</div>
<!-- / Layout wrapper -->

<?php
include 'include/script.php';
?>