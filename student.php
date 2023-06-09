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
                                    <button type="button" class="btn btn-success  m-2" data-bs-toggle="modal" data-bs-target="#studentmodal">
                                        Add student
                                    </button>
                                </div>
                                <h5 class="card-header">Student Table</h5>
                                <div class="table-responsive text-nowrap" id="studentTable">
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



                <div class="modal fade" id="studentmodal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalCenterTitle">student Modal</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">

                                <form id="studentform">
                                    <input type="hidden" name="update_id" id="update_id">


                                    <div class="row">



                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="">frist_name</label>
                                                <input type="text" name="fristname" id="fristname" class="form-control" required>
                                            </div>

                                        </div>

                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="">last_name</label>
                                                <input type="text" name="lastname" id="lastname" class="form-control" required>
                                            </div>

                                        </div>

                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="">mother_name</label>
                                                <input type="text" name="mother_name" id="mother_name" class="form-control" required>
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
                                                <label for="">distract</label>
                                                <input type="text" name="distract" id="distract" class="form-control" required>
                                            </div>

                                        </div>

                                        <div class="col-sm-6 mt-3">
                                            <div class="form-group">
                                                <label for="">discount</label>
                                                <input type="text" name="discount" id="discount" class="form-control" required>
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