'use strict';
const Homey = require('homey');

const { ZwaveDevice } = require('homey-zwavedriver');

// Documentation: https://Products.Z-WaveAlliance.org/ProductManual/File?folder=&filename=Manuals/2309/110050438 BDAL L 810 LED IHF SMARTHOME D-GB-F-I-NL.pdf

class SteinelL810LED extends ZwaveDevice {
	async onNodeInit() {

		// enable debugging
		// this.enableDebug();

		// print the node's info to the console
		// this.printNode();

		this.registerCapability('onoff', 'SWITCH_BINARY');
		this.registerCapability('dim', 'SWITCH_MULTILEVEL');
		this.registerCapability('measure_luminance', 'SENSOR_MULTILEVEL');
		this.registerCapability('alarm_motion', 'NOTIFICATION');

		// Register triggers for flows
		// this.triggerAlarmMotionOn = this.homey.flow.getDeviceTriggerCard('sensor_alarm_motion_on');
		// this.triggerAlarmMotionOff = this.homey.flow.getDeviceTriggerCard('sensor_alarm_motion_off');
		// this.triggerMeasureLuminance = this.homey.flow.getDeviceTriggerCard('sensor_measure_luminance');

		// Register conditions for flows
		// this.conditionAlarmMotionIsOn = this.homey.flow
		// 	.getConditionCard("sensor_alarm_motion_is_on")
		// 	.registerRunListener((args, state) => {
		// 		return Promise.resolve(this.getCapabilityValue('alarm_motion'));
		// 	})

		// this.registerCapabilityListener('alarm_motion', this._onCapabilityAlarmMotion.bind(this))

		// register a report listener
		// this.registerReportListener('NOTIFICATION', 'NOTIFICATION_REPORT', this._onCapabilityAlarmMotion.bind(this));

		// this.registerCapabilityListener('measure_luminance', this._onCapabilityMeasureLuminance.bind(this))

		// register a report listener
		// this.registerReportListener('SENSOR_MULTILEVEL', 'SENSOR_MULTILEVEL_REPORT', this._onCapabilityMeasureLuminance.bind(this));

	}

	onSettings(event) {
		// Disable ON/OFF as we are in stupid mode
		if (event.newSettings.slave_mode === '4' && this.hasCapability('onoff') ) {
			this.log('Removing on/off capability to device');
			this.removeCapability('onoff');
			this.setClass('sensor');
		}

		// Enable ON/OFF as we are not in stupid mode
		if (event.newSettings.slave_mode !== '4' && !this.hasCapability('onoff') ) {
			this.log('Readding on/off capability from device');
			this.addCapability('onoff');
			this.registerCapability('onoff', 'SWITCH_BINARY');
			this.setClass('light');
		}
	}

	// _onCapabilityAlarmMotion(rawReport, parsedReport) {
	// 	if (parsedReport != undefined) {
	// 		this.log('_onCapabilityAlarmMotion', parsedReport, `triggerAlarmMotion${parsedReport ? 'On' : 'Off'}`);
	// 		this[`triggerAlarmMotion${parsedReport ? 'On' : 'Off'}`].trigger(this, null, null)
	// 	}
	// 	return true;
	// }

	// _onCapabilityMeasureLuminance(rawReport, parsedReport) {
	// 	this.log('_onCapabilityMeasureLuminance', parsedReport);
	// 	this.triggerMeasureLuminance.trigger(this, {
	// 		luminance: parsedReport,
	// 	}, null)
	// 	return true;
	// }
}
module.exports = SteinelL810LED;
