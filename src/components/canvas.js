import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CachedIcon from '@material-ui/icons/Cached';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import compose from 'recompose/compose';
import { connect } from 'react-redux'


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    bigAvatar: {
        width: 70,
        height: 40
    },
    button: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

class Canvas extends Component {
    state = {
        open: false
    }
    handleDialogOpen = () => {
        this.setState({
            open: true
        })
    }
    handleDialogClose = () => {
        this.setState({
            open: false
        })
    }

    render() {
        const { classes, data, onGetReportbyId, reportsById } = this.props;
        const City = data.name + '-' + data.sys.country
        const ImgUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

        return (
            <Grid item xs={4} >
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar src={ImgUrl} className={classes.bigAvatar} />
                        }
                        title={City} />

                    <CardContent>
                        <Typography component="p">
                            <b>Current Temp: {data.main.temp}&#8451;</b> | <b>Min: {data.main.temp_min}&#8451;</b> | <b> Max: {data.main.temp_max}&#8451;</b>
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <Button variant="contained" color="primary" className={classes.button} onClick={() => {
                            this.handleDialogOpen();
                            onGetReportbyId(data.id)
                        }}>
                            5 days Reports
        <CachedIcon className={classes.rightIcon} />
                        </Button>
                    </CardActions>
                </Card>
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleDialogClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"5 Day's Every 3 Hours Weather Report"} -{data.name}
                    </DialogTitle>
                    <DialogContent>
                        {
                            reportsById.map((dayReport, index) => {
                                return <div key={index}>
                                    {dayReport.list.map((dailyReport, index) => {
                                        return <Card key={index} style={{ margin: 10 }}>
                                            <CardHeader
                                                avatar={
                                                    <Avatar src={"http://openweathermap.org/img/w/" + dailyReport.weather[0].icon + ".png"} className={classes.bigAvatar}></Avatar>
                                                }
                                                title={dailyReport.dt_txt} subheader={dailyReport.weather[0].description} />
                                            <CardContent>
                                                <Typography component="p">
                                                    <b>Min: {dailyReport.main.temp_min}</b> | <b> Max: {dailyReport.main.temp_max}</b>
                                                </Typography>
                                            </CardContent>

                                        </Card>
                                    })}
                                </div>
                            })
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogClose} color="primary">
                            CLOSE
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>


        )
    }
}
Canvas.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        reportsById: state.reportsById
    };
};
export default compose(withStyles(styles), connect(mapStateToProps, null))(Canvas);