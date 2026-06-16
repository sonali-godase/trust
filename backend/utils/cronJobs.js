const cron = require('node-cron');
const Annadaan = require('../models/Annadaan');
const sendEmail = require('./sendEmail');

const startCronJobs = () => {
  // Run every day at 08:00 AM
  cron.schedule('0 8 * * *', async () => {
    console.log('[Cron] Running Annadaan reminder check at 08:00 AM...');
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Find all approved Annadaan bookings in the future
      const upcomingAnnadaans = await Annadaan.find({
        status: 'approved',
        date: { $gte: today }
      });

      for (const annadaan of upcomingAnnadaans) {
        const annadaanDate = new Date(annadaan.date);
        annadaanDate.setHours(0, 0, 0, 0);
        
        // Calculate diff in time
        const diffTime = Math.abs(annadaanDate - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Define specific target reminder days
        const targetDays = [30, 7, 6, 5, 4, 3, 2, 1];

        if (targetDays.includes(diffDays)) {
          console.log(`[Cron] Sending reminder to ${annadaan.email} for Annadaan in ${diffDays} day(s)`);
          
          const message = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
              <div style="background-color: #f59e0b; padding: 20px; text-align: center;">
                <h2 style="color: white; margin: 0;">Annadaan Reminder</h2>
              </div>
              <div style="padding: 20px;">
                <p>Dear <strong>${annadaan.name}</strong>,</p>
                <p>This is a gentle reminder that your scheduled Annadaan is coming up in <strong>${diffDays} day${diffDays > 1 ? 's' : ''}</strong>.</p>
                
                <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 5px 0;"><strong>Annadaan Type:</strong> ${annadaan.annadaanType}</p>
                  <p style="margin: 5px 0;"><strong>Scheduled Date:</strong> ${annadaanDate.toLocaleDateString()}</p>
                  <p style="margin: 5px 0;"><strong>Scheduled Time:</strong> ${annadaan.time}</p>
                </div>
                
                <p>We look forward to welcoming you. If you have any questions or need to make changes, please contact the administration.</p>
                <br/>
                <p>Warm Regards,</p>
                <p><strong>Trust Management System</strong></p>
              </div>
            </div>
          `;

          await sendEmail({
            email: annadaan.email,
            subject: `Reminder: Upcoming Annadaan in ${diffDays} day(s)`,
            html: message
          });
        }
      }
    } catch (error) {
      console.error('[Cron] Error processing Annadaan reminders:', error);
    }
  });

  console.log('[Cron] Scheduler initialized successfully.');
};

module.exports = startCronJobs;
